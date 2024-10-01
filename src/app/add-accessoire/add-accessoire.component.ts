import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';

import { AccessoireService } from '../services/accessoire.service';
import { Marque } from '../model/marque.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-accessoire',
  templateUrl: './add-accessoire.component.html',
  styleUrls: ['./add-accessoire.component.css'],
})
export class AddAccessoireComponent implements OnInit {
  marques!: Marque[];
  newIdMar!: number;
  newMarque!: Marque;

  newAccessoire = new Accessoire();

  constructor(private accService: AccessoireService, private router: Router) {}
  ngOnInit(): void {
    this.accService.listeMarques().subscribe((mar) => {
      console.log(mar);
      this.marques = mar._embedded.marques;
    });
  }

  addAccessoire() {
    this.newAccessoire.marque = this.marques.find(
      (mar) => mar.idMar == this.newIdMar
    )!;
    this.accService.ajouterAccessoire(this.newAccessoire).subscribe((acc) => {
      console.log(acc);
      this.router.navigate(['accessoires']);
    });
  }
}
