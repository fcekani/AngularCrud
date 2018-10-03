import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
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
export class AlbumsComponent implements OnInit {

  isLoading: boolean
  albums: Object

  constructor(private data: DataService) { }

  ngOnInit() {

    if(localStorage.getItem('albums')){
      this.albums = JSON.parse(localStorage.getItem('albums'))
    }

    else{
      this.isLoading = true
      this.data.getAlbums().subscribe(
        data => {
          this.isLoading = false
          if(data){
            this.albums = data
            localStorage.setItem('albums', JSON.stringify(data))
          }
        }
      )
    }
  }
}
