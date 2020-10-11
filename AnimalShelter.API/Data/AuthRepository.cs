using System.Threading.Tasks;
using AnimalShelter.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelter.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            //retrieve user from database
            var user = await _context.Users.Include(u => u.ProfilePicture).FirstOrDefaultAsync(x => x.UserName == username);
            
            //see if user exists
            if (user == null)
                return null;

            //verify that given password matches the hash and salt in the database for that user
            // if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            //     return null;
            
            return user;

        }

        //create hash out of input password and compare to hash in database - return bool
        private bool VerifyPassword(string password, byte[] passwordHash, byte[] PasswordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i<computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            // user.PasswordHash = passwordHash;
            // user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(u => u.UserName == username))
                return true;
            return false;
        }
    }
}