import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: [
    `
      .error-page {
        text-align: center;
        padding: 20px;
        margin: 0.5rem;
      }
      h1 {
        font-size: 4rem;
        margin-bottom: 20px;
      }
      p {
        font-size: 2rem;
      }
      button {
        padding: 10px 20px;
        margin-top: 1rem;
        font-size: 1.2rem;
      }
    `,
  ],
})
export class NotFoundComponent implements OnInit {
  message!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.message = this.route.snapshot.data['message'];
    this.openSnackBar(this.message);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  OnGoMainPage(): void {
    this.router.navigate(['']);
  }
}
