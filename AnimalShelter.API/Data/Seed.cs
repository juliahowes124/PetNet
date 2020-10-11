using System.Collections.Generic;
using System.Linq;
using AnimalShelter.API.Data;
using AnimalShelter.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
				//input data context 
        public static void SeedUsers(DataContext context) {
						//if there are no users in our database
            if (!context.Users.Any()) 
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
								//read file and then deserialize it into a list of user objects
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users) 
                {
										//declare password variables and create password hash and salt and store into variables
                    byte[] passwordhash, passwordSalt;
                    CreatePasswordHash("password", out passwordhash, out passwordSalt);

                    // user.PasswordHash = passwordhash;
                    // user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();
										//Add the new user to the data context
                    context.Users.Add(user);
                }
								//now save the data context 
                context.SaveChanges();
            }
        }

				//We copied this from elsewhere
         private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()) 
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}