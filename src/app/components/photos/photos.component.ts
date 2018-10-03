import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
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

export class PhotosComponent implements OnInit {

  isLoading: boolean
  photos: Object

  constructor(private data: DataService) {
   }

  ngOnInit() {
    if(localStorage.getItem('photos')){
        this.photos = JSON.parse(localStorage.getItem('photos'))
    }

    else{
      this.isLoading = true;
      this.data.getPhotos().subscribe(
        data => {
          this.isLoading = false
          if(data){
            this.photos = data
            localStorage.setItem('photos', JSON.stringify(this.photos))
          }
        }
      )
    }
  }
}
