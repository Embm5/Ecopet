import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../interfaces/persona';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-persona',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-persona.component.html',
  styleUrl: './formulario-persona.component.css'
})
export class FormularioPersonaComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft

  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  numberRegex = /^\d+(\.\d{1,2})?$/
  cedRegex = /^[0-9]\d{7,9}$/
  passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  form = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    Primer_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Primer_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)])
  })
  form2 = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    Primer_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Primer_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
  })


  id: string = ''
  operacion: string = 'Create '
  rolSeleccionado: string = ''
  isEditable = true
  private router: Router = inject(Router)

  constructor(private _personaService: PersonaService, private aRouter: ActivatedRoute, private toastr: ToastrService) {
    this.id = aRouter.snapshot.paramMap.get('id')!

  }

  ngOnInit(): void {
    if (this.id !== '') {
      this.operacion = 'Edit '
      this.isEditable = false
      this.getPersona(this.id)
    } else {
      this.isEditable = true
    }
  }

  CUPersona() {
    if (this.id !== '') { //editar
      const persona: Persona = {
        cedula: this.form2.value.cedula!,
        Primer_nombre: this.form2.value.Primer_nombre!,
        Segundo_nombre: this.form2.value.Segundo_nombre!,
        Primer_Apellido: this.form2.value.Primer_Apellido!,
        Segundo_Apellido: this.form2.value.Segundo_Apellido!,
        IdRol: Number(this.rolSeleccionado),

      }
      persona.cedula = this.id
      this._personaService.updatePersona(this.id, persona).subscribe({
        next: () => {

          this.volver()
          this.toastr.info(`Persona ${persona.Primer_Apellido} Update!`, 'Updated person')
        }, error: (e: HttpErrorResponse) => {
          this.toastr.error(`Could not update Person: Make sure you enter the data correctly`, 'Error updating Person')
        }
      })
    } else {  //crear
      const persona: Persona = {
        cedula: Number(this.form.value.cedula!),
        Primer_nombre: this.form.value.Primer_nombre!,
        Segundo_nombre: this.form.value.Segundo_nombre!,
        Primer_Apellido: this.form.value.Primer_Apellido!,
        Segundo_Apellido: this.form.value.Segundo_Apellido!,
        email: (this.form.value.email!),
        password: (this.form.value.password!),
        IdRol: Number(this.rolSeleccionado),
      }
      this._personaService.agregar(persona).subscribe({
        next: () => {

          this.volver()
          this.toastr.success(`Person ${persona.Primer_Apellido} Created Successfully!`, 'Person Created')
        }, error: (e: HttpErrorResponse) => {
          this.toastr.error(`Could not create the person: Please make sure to enter the data correctly`, 'Error Creating Person')
        }
      })
    }
  }

  getPersona(cedula: string) {
    this._personaService.getById(cedula).subscribe((data: Persona) => {
      if (this.operacion === 'Create ') {
        this.form.setValue({
          cedula: String(data.cedula),
          Primer_nombre: data.Primer_nombre,
          Segundo_nombre: data.Segundo_nombre,
          Primer_Apellido: data.Primer_Apellido,
          Segundo_Apellido: data.Segundo_Apellido,
          email: data.email!,
          password: data.password!,
        })
      } else {
        (data)
        this.form2.setValue({
          cedula: String(data.cedula),
          Primer_nombre: data.Primer_nombre,
          Segundo_nombre: data.Segundo_nombre,
          Primer_Apellido: data.Primer_Apellido,
          Segundo_Apellido: data.Segundo_Apellido
        })
        this.rolSeleccionado = String(data.IdRol)

      }
    })
  }

  volver() {
    this.router.navigate(['persona'])
  }

  capturarRol(event: Event): void {
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    this.rolSeleccionado = valorSeleccionado


  }
}
