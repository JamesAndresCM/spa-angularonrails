import { ViewChild, Input, Component, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Character } from '../../models/character';
import { Category } from '../../models/category';
import { CharactersService } from '../../services/characters.service';
import { CategoriesService } from '../../services/categories.service';
import { AlertService } from '../../services/alert.service';

//REFACTOR THIS dont forget...

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {

    @ViewChild('AddCharacterModal') addCharacterModal;
    @ViewChild('fileInput') fileInput: ElementRef;
    @Input() data: any;

    

    @Output() status = new EventEmitter();

    private modalRef: NgbModalRef;
    closeResult: string;
    loading = false;
    submitted = false;
    image: string;
    public _charForm: FormGroup;
    public character: any;
    public characters: any;
    public category: Category[] = [];

    resetForm(){
      this._charForm.reset({
        name: '',
        bio: '',
        release: '',
        img: '',
        category_id: ''
        });
    }

    
    
    constructor(
      public activeModal: NgbActiveModal,
      private modal: NgbModal, 
      private characterService: CharactersService, 
      private alertService: AlertService, 
      private categoryService: CategoriesService, 
      private _formBuilder: FormBuilder
      ) {}

    ngOnInit() {
        this._charForm = this._formBuilder.group({
          name: [ '', [Validators.required]],
          bio: [ '', [Validators.required]],
          img: [''],
          release: [ '' , [Validators.required]],
          category: [''],
        });
        
    }

    get f() { return this._charForm.controls; }

    open(data?: any){
      this.getCategories();
      this.data = data;
      if(data){
         this._charForm = this._formBuilder.group({
            name: [ this.data.name, [Validators.required]],
            bio: [ this.data.bio, [Validators.required]],
            img: [this.data.img.url],
            release: [ this.convert_date() , [Validators.required]],
            category: [this.data.category.name],
          });
        }else{
          this.ngOnInit();
        }
      this.modalRef = this.modal.open(this.addCharacterModal)

      //this.modalRef.result.catch(() => {});
      //this.modalRef.result.then(() => { console.log("close"); }, () => { console.log("close"); })
       
    }

    closeModal(){
      this.modalRef.close();
    }

    convert_date(){
      let date_parse = this.data.release.split("-")
      return {year: parseInt(date_parse[0]), month: parseInt(date_parse[1]), day: parseInt(date_parse[2])}
    }

    parse_date(){
      return this.f.release.value.year + "-" + this.f.release.value.month + "-" + this.f.release.value.day;
    }

    data_character(){
      let date_parse = this.parse_date();
      if(this.f.img.value === "" ){
        this.character = {character: {name: this.f.name.value, bio: this.f.bio.value, release: date_parse, category_id: this.f.category.value}}
        }
      else{
        let image = "data:image/png;base64,"+ this.f.img.value.value; 
        this.character = {character: {name: this.f.name.value, bio: this.f.bio.value, release: date_parse, img: image, category_id: this.f.category.value}} 
      }
      this.character = JSON.stringify(this.character);

      return this.character;
    }

     data_character_update(){
        let img_data = (this.f.img.value.value === undefined) ? this.f.img.value : "data:image/png;base64,"+ this.f.img.value.value;
        if(isNaN(this.f.category.value)){
          this.character = {character: {name: this.f.name.value, bio: this.f.bio.value, release: this.parse_date(), img: img_data}} 
        }else{
          this.character = {character: {name: this.f.name.value, bio: this.f.bio.value, release: this.parse_date(), img: img_data, category_id: this.f.category.value}} 
        }
        this.character = JSON.stringify(this.character);
        return this.character;
     }

     valid_content_type(){
        let c_type = ["image/jpeg", "image/png", "image/jpg"];
        if (this.f.img.value && c_type.includes(this.f.img.value.filetype) == false ){
            this.modalRef.close();
            this.alertService.error("Error Content type image is not valid...");
            this.submitted = false;
            return true;
        }else{ return false; }
     }

    onSubmit() {
      this.submitted = true;
      if (this._charForm.invalid) {return;}
      this.loading = true;
     
      this.character = this.data_character();

      //UPDATE
      if(this.data){
        this.character = this.data_character_update();
          
          let c_type = ["image/jpeg", "image/png", "image/jpg"];

          if (this.f.img.value.value === undefined || (c_type.includes(this.f.img.value.filetype) == true )){
          this.characterService.editCharacter(this.data.id,this.character).subscribe(
            result =>{
              if(result.status == 200){

                 //this.data_result = result.data;

                 this.modalRef.close();
                 this.ngOnInit();
                 this.resetForm();
                 this.alertService.success(`Character ${this.data.name} has been updated`, true);

                 this.status.emit(true);

                 this.submitted = false;
              }else{
                 for (var key in result.msg){
                 let error_msg = key.charAt(0).toUpperCase() + key.slice(1)+": "+result.msg[key];
                  this.alertService.error(error_msg);
                  this.modalRef.close();
                  this.submitted = false;
                  this.loading = false;
                }
              }
            },
            error =>{
              console.log(error);
            }
          )
        }else{
          this.modalRef.close();
          this.alertService.error("Error Content type image is not valid...");
          this.submitted = false;
        }

      }else{
    //console.log(this.f.img.value);

      //INSERT
      if (!this.valid_content_type()){
          this.characterService.addCharacter(this.character).subscribe(
             result => {
              if(result.status == 422){
                 for (var key in result.msg){
                 let error_msg = key.charAt(0).toUpperCase() + key.slice(1)+": "+result.msg[key];
                  this.alertService.error(error_msg);
                  this.modalRef.close();
                  this.submitted = false;
                  this.loading = false;
                }
              }else{
                 this.modalRef.close();
                 
                 this.status.emit(true);

                 this.alertService.success(result.msg, true);
                 this.resetForm();
                 this.submitted = false;
              }
            },
              error => {
                console.log(error);           
            })
      }
    }
  }

  getCategories(){
      this.categoryService.getAll().subscribe(
      result => { this.category = result;},
      error => {console.log(error);}
      )
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this._charForm.get('img').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
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

  filterCategory(_category){
      if(_category){
        return this.category.filter(x => x.id != _category);
      }else{ 
        return this.category; 
     }
   }
}
