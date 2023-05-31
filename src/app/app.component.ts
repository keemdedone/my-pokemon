import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const base_url = 'https://pokeapi.co/api/v2';

export type poke = {
  name: string;
  photo: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-pokemon';
  results: poke[] = [];
  loading = false;

  constructor(private HTTP: HttpClient) {}

  ngOnInit(): void {
    this.onGetPoke();
  }

  onGetPoke() {
    this.loading = true;
    const requests = [];

    for (let i = 1; i <= 104; i++) {
      const request = this.HTTP.get(`${base_url}/pokemon/${i}/`);
      requests.push(request);
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      responses.forEach((data: any) => {
        const pokemonName = data.name;
        const pokemonPhotoUrl = data.sprites.front_default;
        const pokemonData = {
          name: pokemonName,
          photo: pokemonPhotoUrl,
        };
        this.results.push(pokemonData);
      });

      this.loading = false;
    });
  }
}
