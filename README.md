# Google 2FA with ASP.NET Core

## Run

TBD

## Data schema

User

- `id(pk, auto)`
- username
- email(unique key)
- password
- TwoFAEnabled
- HasAuthenticator
- TwoFARemember

External providers

- `id(pk, auto)`
- provider

UserToken

- UserId
- LoginProvider
- Name(AuthenticatorKey, RecoveryCodes)  
- Value(key for authenticator)

## References

- [Two Factor Authentication in ASP.NET CORE](https://www.youtube.com/watch?v=Q-FMEL9KoEs)
- [ASP.NET Core 3.1 - 2FA Without Identity](https://kenhaggerty.com/articles/article/aspnet-core-31-2fa-without-identity)
- [ASP.NET Core Identity Series – Two Factor Authentication](https://chsakell.com/2019/08/18/asp-net-core-identity-series-two-factor-authentication/)