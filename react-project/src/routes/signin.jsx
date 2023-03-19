import './signin.css';

export default function SignIn() {
    return (
        <>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="tabs">
                        <h2 className="active" id="SignIn">
                            <a href="/signin">Sign In</a>
                        </h2>
                        <h2 className="inactive underlineHover" id="SignUp">
                            <a href='/signup'>Sign Up</a>
                        </h2>
                    </div>

                    <form>
                        <input
                            type="text"
                            id="email"
                            className="fadeIn second"
                            name="login"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            id="password"
                            className="fadeIn third"
                            name="login"
                            placeholder="Password"
                        />
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>

                    <div id="formFooter">
                        <a className="underlineHover" href="/forgotpassword">Forgot Password?</a>
                    </div>
                </div>
            </div >
        </>
    )
}
