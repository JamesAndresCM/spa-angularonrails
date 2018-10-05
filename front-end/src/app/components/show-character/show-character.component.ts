import { Input, ViewChild, Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Character } from '../../models/character';

@Component({
  selector: 'app-show-character',
  templateUrl: './show-character.component.html',
  styleUrls: ['./show-character.component.css']
})
export class ShowCharacterComponent implements OnInit {

  @ViewChild('characterModal') characterModal;
  private modalRef: NgbModalRef;
  closeResult: string;
  character: any;

  constructor(private modal: NgbModal, private characterService: CharactersService) {}

  open(id:number) {
    this.characterService.getByID(id).subscribe(
      result => {
        if(result.status == 200){
          this.character = result.body;
        }
      },
      error => {
        console.log(error);
      });
      this.modalRef = this.modal.open(this.characterModal)
    this.modalRef.result.catch(() => {});
  }

  ngOnInit(){
    this.character;
  }

  closeModal(){
    this.modalRef.close();
  }
}
