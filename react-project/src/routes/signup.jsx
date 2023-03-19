import './signin.css';

export default function SignUp() {
    return (
        <>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="tabs">
                        <h2 className="inactive underlineHover" id="SignIn">
                            <a href="/signin">Sign In</a>
                        </h2>
                        <h2 className="active" id="SignUp">
                            <a href="/signup">Sign Up</a>
                        </h2>
                    </div>


                    <form>
                        <input type="text" id="email" className="fadeIn second" name="login" placeholder="Email" />

                        <input type='text' id='username' className='fadeIn second' name='login' placeholder='Username' />

                        <input type="password" id="password" classNameName="fadeIn third" name="login" placeholder="Password" />


                        <input type='password' id='passwordConfirm' className='fadeIn third' name='login' placeholder='Password Confirm' />
                        <input type="submit" className="fadeIn fourth" value="Sign Up" onclick="window.location.replace('Menu.html');" />
                    </form>
                </div>
            </div>
        </>
    )
}