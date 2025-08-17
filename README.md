# Recipe App - Mobile UI Design Documentation

## Style and Colors
- **Style:** Clean, modern, minimalist  
- **Color Palette:** Pastel oranges + neutral tones  
- **Typography Scale:** 
  - `H1`, `H2`, `Body`, `Caption`
- **Shadow / Elevation:** Tokens for UI hierarchy  
- **Border-radius Scale:** Consistent corner rounding  
- **Component Library:** All components shown with their variants  

---

## Screens and Components

### 1. Onboarding
- **Content:** Illustration, title, subtitle, “Sign Up” and “Log In” buttons  
- **Button States:** Default, Hover, Disabled  

### 2. Authentication
- **Sign Up Screen:** Username, email, password fields (Default, Focused, Error states)  
- **Login Screen:** Username or email + password fields  
- **Social Login Buttons**  
- **Forgot Password Link**  
- **Loading Spinner** (during submission)  

### 3. Forgot Password Flow
1. Email input + Send button  
2. 4-digit verification code input screen (4 boxes) + Confirm button  
3. New password screen (Password input: Default, Focused, Error states) + Confirm button  

### 4. Home Screen
- **Recipe Cards:** Grid / List view  
- **Card Content:** Image, Title, Save icon  
- **Card States:** Default, Favorite (filled icon), Selected (border/shadow)  

### 5. Search Screen
- Search input + Suggestion dropdown + Filter button  
- Input States: Default, Focused, Error  
- Messages: Loading, No results  

### 6. Filter Screen
- Toggle buttons (e.g., Vegan, Dessert) → States: On, Off, Disabled  
- Difficulty Slider → States: Min, Max, Dragging  

### 7. Recipe Detail
- Image gallery  
- Ingredient list (checkable)  
- Step-by-step instructions  
- Buttons: Save, Share, Back (Normal, Pressed)  

### 8. Recipe Upload
- Title input  
- Photo upload area  
- Ingredients & steps fields  
- Field States: Empty, Typing, Error, Success  
- Upload States: Placeholder, Loading spinner, Success  

### 9. Favorites / Profile
- Saved recipes grid view  
- Profile avatar: Placeholder, Uploaded, Error  
- Username + Edit icon → Edit screen (Input + Confirm)  
- Log out button  

### 10. Other User Profile
- Avatar, username, followers/following counts  
- Follow / Unfollow button  
- User’s recipes → Grid / List  
- Clicking followers/following → List screen  

### 11. Notifications
- Like and follower notifications → List view  
- Newest notification at the top  

### 12. Followers / Following
- List: User avatar, username, Follow / Unfollow button  
- Search input  
- Horizontal swipe to switch: Followers ↔ Following  

### 13. Navigation Bar
- Fixed bottom navigation bar: Home, Search, Share Recipe, Notifications, Profile  
- Scroll behavior: Scroll down → hides, Scroll up → reappears  

---

## User Flows
- From Search screen, click “Filter” → opens filter modal  
- Tap on recipe card → navigates to Detail screen  
- Click “Upload” → opens Recipe Upload screen  
- Click “Save” → toggles favorite state  
- Click “Forgot Password” → starts verification flow  
- Tap Edit icon in Profile → opens username edit screen  
- Tap follower count → opens followers list, Tap following count → opens following list  
- Visiting another user profile → shows their recipes, Follow button, followers/following lists  

---

## General Principles
- Consistent spacing and alignment across all screens  
- Visual hierarchy and readability prioritized  
- Component library documents all component variants  
