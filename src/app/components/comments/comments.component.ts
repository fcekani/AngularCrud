import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: Object
  constructor(private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.comments = params.id)
  }

  ngOnInit() {
    this.data.getComments(this.comments).subscribe(
      data => this.comments = data
    )
  }

}
