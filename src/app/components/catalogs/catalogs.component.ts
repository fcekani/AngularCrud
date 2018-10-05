import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Catalogs } from '../../models/catalogs';
import { Configuration } from '../../models/configuration';
import { Requestdata } from '../../models/requestdata';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss'],
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
export class CatalogsComponent implements OnInit {

  isLoading: boolean
  nodata: string
  requestData = new Requestdata
  catalogs: any
  configuration = new Configuration

  constructor(private data: DataService) { }

  ngOnInit() {

    this.isLoading = true

    if(localStorage.getItem('configurations')){
      this.configuration = JSON.parse(localStorage.getItem('configurations'))
    }

    else{
      this.data.getConfigurationsData().subscribe(function(data){
        console.log(data)
      })
    }

    this.requestData.url = this.configuration.MiddlewareIP + ":" + this.configuration.MiddlewarePort + "/data/catalogs" //"http://85.131.135.186:5505/data/catalogs"
    this.requestData.methodType = "GET"
    this.requestData.credentials = { "Username": this.configuration.Username, "Password" : this.configuration.Password}

    this.data.getCatalogs(this.requestData).subscribe(
      data => {
        this.catalogs = data
        this.isLoading = false
      }, 
      error => {
        this.nodata = "Failed to recieve data from API"
      }
    )
  }
}
