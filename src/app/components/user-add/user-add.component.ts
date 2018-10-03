import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  constructor(private data: DataService) { }

  u = new User()
  users = []

  ngOnInit() {
  }

  onSubmit() {
    this.data.addUser(this.u).subscribe(u => this.users.push(u));
    this.u = new User();
  }
}
