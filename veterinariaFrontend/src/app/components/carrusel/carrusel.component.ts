import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-carrusel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './carrusel.component.html',
    styleUrl: './carrusel.component.css'
})
export class CarruselComponent {
    private IMAGENES = [
        '../../../assets/veterinario.jpg',
        '../../../assets/exotic-pets.jpg',
        '../../../assets/exoticanimal.jpg'
    ];
    private TIEMPO_INTERVALO_MILESIMAS_SEG = 8000;
    posicionActual = 0;
    intervalo: any;

    ngOnInit() {
        this.playIntervalo();
    }

    pasarFoto(): void {
        this.posicionActual = (this.posicionActual + 1) % this.IMAGENES.length;
        this.renderizarImagen();
    }

    retrocederFoto(): void {
        this.posicionActual = (this.posicionActual - 1 + this.IMAGENES.length) % this.IMAGENES.length;
        this.renderizarImagen();
    }

    renderizarImagen(): void {
        const imagenDiv = document.getElementById('imagen');
        if (imagenDiv) {
            imagenDiv.style.backgroundImage = `url(${this.IMAGENES[this.posicionActual]})`;
        }
    }

    playIntervalo(): void {
        this.intervalo = setInterval(() => this.pasarFoto(), this.TIEMPO_INTERVALO_MILESIMAS_SEG);
    }

    stopIntervalo(): void {
        clearInterval(this.intervalo);
    }

    pasarFotoManual(): void {
        this.stopIntervalo();
        this.pasarFoto();
        this.playIntervalo();
    }

    retrocederFotoManual(): void {
        this.stopIntervalo();
        this.retrocederFoto();
        this.playIntervalo();
    }
}
