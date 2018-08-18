export class AuthService {
  private isLoginized = false;

  login() {
    this.isLoginized = true;
  }

  logout() {
    this.isLoginized = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isLoginized;
  }
}
