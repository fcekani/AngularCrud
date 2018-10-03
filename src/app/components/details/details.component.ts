import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user: Object;
  userid: number;

  constructor(private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.userid = params.id)
  }

  ngOnInit() {
    this.data.getUser(this.userid).subscribe(
      data => this.user = data
    )
  }

}
