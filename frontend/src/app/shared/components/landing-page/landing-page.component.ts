import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  
   questions_img=[
    'https://cdn.sstatic.net/Img/home/illo-feats-ask.svg?v=b6cd07f0765a',
    'https://cdn.sstatic.net/Img/home/illo-feats-vote.svg?v=9d2eb0efdc17',
    'https://cdn.sstatic.net/Img/home/illo-feats-answer.svg?v=b637b99bc32a',
    'https://cdn.sstatic.net/Img/home/illo-feats-tags.svg?v=0655cbe6bffa',
    'https://cdn.sstatic.net/Img/home/illo-feats-accept.svg?v=f2be4b8dfdac',
    'https://cdn.sstatic.net/Img/home/illo-feats-recognize.svg?v=4f011d7173e8'
]
objects = [
  {
    name: 'Object 1',
    imageUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-ask.svg?v=b6cd07f0765a'
  },
  {
    name: 'Object 2',
    imageUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-vote.svg?v=9d2eb0efdc17'
  },
  {
    name: 'Object 3',
    imageUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-answer.svg?v=b637b99bc32a'
  },
  {
    name: 'Object 4',
    imageUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-tags.svg?v=0655cbe6bffa'
  },
  {
    name: 'Object 5',
    imageUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-accept.svg?v=f2be4b8dfdac'
  },
  {
    name: 'Object 6',
    imageUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-recognize.svg?v=4f011d7173e8'
  }
];

selectedObjectIndex=0;


 
// question_item_isSelected=false;


/*Questions Animation*/
 
}
