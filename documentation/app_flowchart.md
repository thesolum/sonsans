flowchart TD
    Start[Welcome Screen] --> Choice{SignUp or Guest}
    Choice --> SignUp[Sign Up]
    Choice --> Guest[Continue as Guest]
    SignUp --> Email[Email Password]
    SignUp --> Google[Google Sign In]
    Email --> Auth[Authenticated]
    Google --> Auth
    Guest --> Home[Home Feed]
    Auth --> Home
    Home --> Detail[Recipe Detail]
    Home --> Search[Search]
    Home --> Fav[Favorites]
    Home --> Profile[Profile]
    Search --> Results[Search Results]
    Results --> Detail
    Fav --> FavList[Favorite List]
    FavList --> Detail
    Profile --> Saved[Saved Recipes]
    Profile --> Edit[Edit Profile]
    Saved --> Detail
    Edit --> Profile
    Profile --> Logout[Sign Out]
    Logout --> Start