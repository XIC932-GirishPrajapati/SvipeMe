const SignWithGoogle = () => {
  return (
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleSignIn}
      // onPress={() =>
      //   onFacebookButtonPress().then(() =>
      //     console.log('Signed in with Facebook!'),
      //   )
      // }
    />
  );
};

export default SignWithGoogle;
