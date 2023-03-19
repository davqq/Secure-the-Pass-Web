<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="SignInOrUp-style.css" />
  <title>Secure the Pass•••</title>
</head>

<body>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->
      <div class="tabs">
        <h2 class="inactive underlineHover" , id="SignIn">
          <a href="SignUp.php?page=SignIn">Sign In</a>
        </h2>
        <h2 class="active" , id="SignUp">
          <a href="SignUp.php?page=SignUp">Sign Up</a>
        </h2>
      </div>


      <!-- Login Form -->
      <form>
        <input type="text" id="email" class="fadeIn second" name="login" placeholder="Email" />

        <input type='text' id='username' class='fadeIn second' name='login' placeholder='Username' />

        <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password" />
        
        
            <input type='password' id='passwordConfirm' class='fadeIn third' name='login' placeholder='Password Confirm' />
        <input type="submit" class="fadeIn fourth" value="Sign Up" onclick="window.location.replace('Menu.html');" />
      </form>
    </div>
  </div>
  <script>
  </script>
</body>

</html>