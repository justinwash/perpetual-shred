import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import axios from 'axios';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  uri = 'http://localhost:4000';

  constructor(private auth: AuthenticationService) {
  }

  async ngOnInit() {
    var token = this.auth.getToken();
    var request = await axios.get(`${this.uri}/user/profile`, { headers: { Authorization: `Bearer ${token}` } });
    this.user = request.data;
  }

}
