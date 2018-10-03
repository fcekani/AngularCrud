import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Configuration } from '../../models/configuration';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isLoading: boolean
  users: Object;
  configuration = new Configuration

  constructor(private data: DataService) {
      if(!localStorage.getItem('configurations')){
        this.data.getConfigurationsData().subscribe(
          data => {
            localStorage.setItem('configurations', JSON.stringify(data[0]))
          })
      }
      else{
        this.configuration = JSON.parse(localStorage.getItem('configurations'))
      }
   }

  ngOnInit() {
  
    if(!localStorage.getItem('users')){
      this.isLoading = true
      this.data.getUsers().subscribe(
        data => {
          this.isLoading = false
          if(data){
            localStorage.setItem('users', JSON.stringify(data))
            this.users = data
          }
        }
      )
    }

    else{
        this.users = JSON.parse(localStorage.getItem('users'))
    }
  }

}
