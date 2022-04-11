import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageDataModel } from '../models/pageDataModel.model';
import { ApiDataService } from '../services/api-data.service';
import { UIDataService } from '../services/ui-data.service';
import { constants } from '../utils/constants';

@Component({
  selector: 'ng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public displayLoading = false;
  public disableRegister = true;
  public usernameErrorLabel = 'This value is required.';
  public passwordErrorLabel = 'This value is required.';
  public userDataForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private readonly router: Router,
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
      headerNavItems: [ ],
      titleText: 'Access your account.'
    }
    this.uiDataService.updatePageData(pageData);
  }

  handleUsernameErrors() {
    this.userDataForm.controls['username'].valueChanges
    .subscribe(val => {
      for (const err in this.userDataForm.controls['username'].errors) {
        this.usernameErrorLabel = this.processErrorMessage(err);
      }
    });
  }

  handlePasswordErrors() {
    this.userDataForm.controls['password'].valueChanges
    .subscribe(val => {
      for (const err in this.userDataForm.controls['password'].errors) {
        this.passwordErrorLabel = this.processErrorMessage(err);
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

  validateUserData() {
    const userPostForm = this.userDataForm;

    if (userPostForm.invalid) {
      this.handleError('Careful with errors!');
    } else {
      this.displayLoading = true;
      const payload = {
        username: userPostForm.value.username,
        password: userPostForm.value.password
      };
      this.apiDataService.verifyUser(payload)
      .subscribe({
        next: (res) => {
          if (res.status) {
            this.handleError('The provided user information is invalid!');
          } else {
            this.handleSuccess('User successfully validated, welcome!');
          }
        },
        error: (err) => {
          this.handleError(constants.DEFAULT_ERR_MESSAGE);
        }
      });
    }
  }

  redirRegister() {
    this.router.navigate(['register']);
   }

}
