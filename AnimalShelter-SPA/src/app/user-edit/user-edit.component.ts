import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { UserPhoto } from '../_models/userPhoto';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  originalUser: User;
  states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
                      'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
                      'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
                      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                      'West Virginia', 'Wisconsin', 'Wyoming'];

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  updateForm: FormGroup;


  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.user = data.user;
      this.originalUser = data.user;
    });
    this.initializeUploader();

    this.createRegisterForm(this.user);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.user.id + '/photo',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: UserPhoto = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
        };
        this.userService.changeMainPhoto(photo.url, this.user);
        this.authService.changeMemberPhoto(photo.url);
      }
    };
  }

  createRegisterForm(user: User) {
    this.updateForm = this.fb.group({
      knownAs: [user.knownAs, Validators.required],
      city: [user.city, Validators.required],
      state: [user.state, Validators.required]
    });
  }

  updateUser() {
    if (this.updateForm.valid) {
      this.user = Object.assign({}, this.updateForm.value);
      this.user.profilePictureUrl = this.originalUser.profilePictureUrl;
      this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.updateForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  reset() {
    this.updateForm.reset(this.user);
  }

  isDifferent() {
    const isSame = (this.updateForm.value.knownAs === this.user.knownAs
              && this.updateForm.value.city === this.user.city
              && this.updateForm.value.state === this.user.state);
    return !isSame;
  }

}
