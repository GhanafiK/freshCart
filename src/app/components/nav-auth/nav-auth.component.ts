import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss',
})
export class NavAuthComponent {
  private readonly _ThemeService = inject(ThemeService);
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;
  theme:string=''

  ngOnInit(): void {
    if(typeof localStorage!=='undefined'){
      if (localStorage.getItem('theme')) {
        document.body.classList.add('dark-mode');
        this.theme='Dark'
      } else {
        document.body.classList.remove('dark-mode');
        this.theme='Light'
      }
    }
  }

  isDarkMode: boolean = this._ThemeService.dark;
  flag: string = '';

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      if(typeof localStorage!=='undefined'){
        localStorage.setItem('theme', 'dark');
      }
      this.theme='Dark'
    } else {
      document.body.classList.remove('dark-mode');
      if(typeof localStorage!=='undefined'){
        localStorage.removeItem('theme');
      }
      this.theme='Light'
    }
  }

  ngAfterContentChecked(): void {
    if(typeof localStorage !=='undefined'){
      if (localStorage.getItem('theme')) {
        this.isDarkMode = true;
        this.theme='Dark'
        
      } else {
        this.isDarkMode = false;
        this.theme='Light'
      }
    }
  }
}
