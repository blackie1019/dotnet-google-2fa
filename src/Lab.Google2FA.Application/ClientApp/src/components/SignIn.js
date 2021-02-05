import React, { Component } from 'react';
import QRCode from 'qrcode.react';

export class SignIn extends Component {
  static displayName = SignIn.name;

  constructor(props) {
    super(props);
    this.state = { timer: 0,  result: '', loading: true };
  }
  
    componentDidMount() {
        this.generateSetupCode();
        this.getCurrentPin();
        this.interval = setInterval(() =>  function (){
            if(this.state.timer === 0){
                this.getCurrentPin();
            }else {
                this.setState({timer: this.state.timer - 1})
            }
        }, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

  render() {
    return (
        <div className="container">
              <div className="text-center text-primary border-bottom mb-1">
                  <h1>Authenticator Account</h1>
              </div>
              <div className="row">
                  <div className="col-sm-12 col-md-10 col-xl-8">
                      <ol className="list">
                          <li>
                              <p>
                                  Download a two-factor authenticator app like Microsoft Authenticator for
                                  <a href="https://go.microsoft.com/fwlink/?Linkid=825071">Windows Phone</a>,
                                  <a href="https://go.microsoft.com/fwlink/?Linkid=825072">Android</a> and
                                  <a href="https://go.microsoft.com/fwlink/?Linkid=825073">iOS</a> or
                                  Google Authenticator for
                                  <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;hl=en">Android</a> and
                                  <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">iOS</a>.
                              </p>
                          </li>
                          <li>
                              <div className="mb-1">
                                  Scan the QR Code or enter this key
                                  <div className="d-inline-flex">
                                      <a className="btn-copy" data-title="Copy" href="#" role="button"
                                         data-original-title="Copy">
                                          <img height="20" src="/images/controls/copy_64.png"/>
                                              <kbd>{this.state.result.ManualEntryKey}</kbd>
                                      </a>
                                  </div> into your two factor authenticator app. Spaces and casing do not matter.
                                  <div id="qrCode" className="pt-2"
                                       title="otpauth://totp/Users%20Without%20Identity:Authenticator%20App%20Simulator?secret=4TKYOHDTO2Y6CLEP6QF3MFOYIAKPKOGD&amp;issuer=Users%20Without%20Identity&amp;digits=6">
                                      {/*<QRCode value={this.state.result.ManualEntryKey} />*/}
                                  </div>
                              </div>
                              <h5>If QR Code invalid, try setting the display's brightness up.</h5>
                          </li>
                          <li>
                              <p>
                                  Once you have scanned the QR code or input the key above, your two factor
                                  authentication app will provide
                                  you with a unique code.
                              </p>
                          </li>
                          <li>
                              <div className="mb-2">
                                  The authenticator app should display:
                              </div>
                              <span className="code-label">{JSON.stringify(this.state.currentPin)}</span>
                              <h4 className="text-warning">
                                  <img className="mr-1" height="25" src="/images/controls/caution_64.png"/>CAUTION:
                                      Reloading the page sets a new key.
                              </h4>
                          </li>
                      </ol>
                  </div>
              </div>
          </div>
    );
  }

    async getCurrentPin() {
        let email = 'blackie1019&#64;gmail.com'
        let uri = `api/twofa/currentPin/${email}`
        const response = await fetch(uri)
        const data = await response.json()
        this.setState({ timer: 30, loading: false, currentPin:data })
    }

    async generateSetupCode() {
        let email = 'blackie1019&#64;gmail.com'
        let uri = `api/twofa/${email}`
        const response = await fetch(uri)
        const data = await response.json()
        this.setState({ result: data, loading: false })
    }
}
