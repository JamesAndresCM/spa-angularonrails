import { ViewChild,Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CharactersService } from '../../services/characters.service'
import { AlertService } from '../../services/alert.service'
import { Character } from '../../models/character';
import { ShowCharacterComponent } from '../show-character/show-character.component';
import { AddCharacterComponent } from '../add-character/add-character.component';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  @ViewChild('characterModal') modal: ShowCharacterComponent;
  @ViewChild('AddCharacterModal') addmodal: AddCharacterComponent;
  character: any;
  _page: number = 1
  _total: number

  public characters: Character[];

  constructor(
    private characterService: CharactersService,
    private alertService: AlertService
  ) { }


  ngOnInit() {
    this.getPages();
    this.getCharPages(1);
  }

  getCharacters(){
    this.characterService.getAll().pipe(first()).subscribe(
      result => {
          this.characters = result;
      },
				error => {
					console.log(<any>error);
				}
			);
  }

  onShowCharacter(id: number){
    this.modal.open(id);
  }

  onAddCharacter(){
    this.addmodal.open();
  }

  onEditCharacter(id: number){
      this.characterService.getByID(id).subscribe(
        result => {
          if(result.status == 200){
            this.character = result.body;
            this.addmodal.open(this.character);
          }
        },
        error => {
          console.log(error);
        });
      
  }

  onDeleteCharacter(id: number){
  if(window.confirm('Are sure you want to delete character '+ id +'?') == true){
    this.characterService.delChar(id).subscribe(
      result => {
        if(result.status == 200){
          this.alertService.error(result.msg);
          this.getCharacters();
          }
        },
        error => {
          console.log(error);
        }
       );
    }
  }


  onClicked(char: string){
    if (char){
    this.characterService.searchCharacter(char).subscribe(
        result => {
          if (result.status == 201){
              this.alertService.error(result.msg);
          }else{
            this.characters = result.msg;
          }
            
        },
          error => {
            console.log(<any>error);
        }
       );
     }
  }


  getPages(){
    this.characterService.getTotalPages().subscribe(
        response => { this._total = response; }
      )
  }

  getCharPages(page: number){
    this.characterService.getPageCharacter(page).subscribe(
      result => { this.characters = result; this._page = page;}
      )
  }
}
