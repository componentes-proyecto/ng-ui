import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { PageDataModel } from '../models/pageDataModel.model';
import { ApiDataService } from '../services/api-data.service';

import { UIDataService } from '../services/ui-data.service';
import { constants } from '../utils/constants';

@Component({
  selector: 'ng-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public displayLoading = false;
  public disableRegister = true;
  public usernameErrorLabel = 'This value is required.';
  public passwordErrorLabel = 'This value is required.';
  public confPasswordErrorLabel = 'This value is required.';
  public createUserForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  
  constructor(
    private readonly uiDataService: UIDataService,
    private readonly apiDataService: ApiDataService
  ) { }

  ngOnInit(): void {
    this.updatePageData();
    this.handleUsernameErrors();
    this.handlePasswordErrors();
  }

  updatePageData() {
    const pageData: PageDataModel = {
      headerNavItems: [
        {
          name: 'My Tasks',
          route: '/tasks'
        }, {
          name: 'My Profile',
          route: '/profile'
        }
      ],
      titleText: 'Let\'s create your account first!'
    }
    this.uiDataService.updatePageData(pageData);
  }

  handleUsernameErrors() {
    this.createUserForm.controls['username'].valueChanges
    .subscribe(val => {
      for (const err in this.createUserForm.controls['username'].errors) {
        this.usernameErrorLabel = this.processErrorMessage(err);
      }
    });
  }

  handlePasswordErrors() {
    this.createUserForm.controls['password'].valueChanges
    .subscribe(val => {
      for (const err in this.createUserForm.controls['password'].errors) {
        this.passwordErrorLabel = this.processErrorMessage(err);
      }
    });

    this.createUserForm.controls['confPassword'].valueChanges
    .subscribe(val => {
      for (const err in this.createUserForm.controls['confPassword'].errors) {
        this.confPasswordErrorLabel = this.processErrorMessage(err);
      }
    });
  }

  handleSuccess(message: string) {
    setTimeout(() => {
      this.displayLoading = false;
      this.uiDataService.displaySnackBar(message, 'success', 'Close');
    }, constants.INTERVAL);
  }

  handleError(message: string) {
    setTimeout(() => {
      this.displayLoading = false;
      this.uiDataService.displaySnackBar(message, 'danger', 'Close');
    }, constants.INTERVAL);
  }

  processErrorMessage(err: string) {
    switch (err) {
      case 'email':
        return 'Value must be an email address.';
      case 'minlength':
        return 'Value must be at least 8 characters to go.';
      case 'required':
        return 'This value is required.';
      case 'passNoMatch':
        return 'The password and it\'s confirmation doesn\'t match.';
      case 'confNoMatch':
        return 'The password confirmation is not correct.';
      default :
        return 'Invalid.';
    }
  }

  registerUser() {
    const userPostForm = this.createUserForm;

    if (userPostForm.invalid) {
      this.handleError('Careful with errors!');
    } else if (userPostForm.controls['password'].value.toLowerCase() !== userPostForm.controls['confPassword'].value.toLowerCase()) {
      this.handleError('The password and confirmation does\'t match!');
    } else {
      this.displayLoading = true;
      const payload = {
        username: userPostForm.value.username,
        password: userPostForm.value.password
      };
      this.apiDataService.postUser(payload)
      .subscribe({
        next: (res) => {
          this.handleSuccess('User successfully registered, now Sign In!');
        },
        error: (err) => {
          this.handleError('Unexpected error during the registry, try again later!');
        }
      });
    }
  }

  redirSignIn() { }
}
