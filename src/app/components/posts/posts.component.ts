import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { User } from '../../models/user';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class PostsComponent implements OnInit {

  isLoading: boolean
  posts

  constructor(private data: DataService) { }

  ngOnInit() {

    if(!localStorage.getItem('posts')){
      this.isLoading = true
      
      this.data.getPosts().subscribe(
        data => {
          this.isLoading = false
          if(data){
            this.posts = data
            this.posts.forEach(element => {
              this.data.getUser(element.userId).subscribe(
                userData => {
                  element.user = userData
                }
              )
            });

            localStorage.setItem('posts', JSON.stringify(this.posts))
          }
        }
      )
    }

    else{
      this.posts = JSON.parse(localStorage.getItem('posts'))
    }
  }

}
