import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { fadeInAnimation } from '../shared/animation';
import { MatDialog } from '@angular/material';
import { UserInfo } from '../shared/interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent implements OnInit {
  showSearch = true;
  user: UserInfo;

  constructor(private coreService: CoreService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.coreService.getUser()
      .subscribe((res: UserInfo) => {
        this.user = res;
      }, error => {
        console.log(error);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmailDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogProfile() {
    const dialogRef = this.dialog.open(ProfileDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogPassword() {
    const dialogRef = this.dialog.open(PasswordDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogContact() {
    const dialogRef = this.dialog.open(ContactDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
@Component({
  selector: 'email-modal',
  templateUrl: 'email-modal.html',
})
export class EmailDialog {}

@Component({
  selector: 'profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileDialog {}

@Component({
  selector: 'password-modal',
  templateUrl: 'password-modal.html',
})
export class PasswordDialog {}

@Component({
  selector: 'contact-modal',
  templateUrl: 'contact-modal.html',
})
export class ContactDialog {}
