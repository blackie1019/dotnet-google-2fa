import React, { Component } from 'react';
import QRCode from 'qrcode.react';

export class Google2FA extends Component {
  static displayName = Google2FA.name

  constructor(props) {
    super(props);
    this.state = { account:`ggyy@gmail.com:${Date.now()}`, timer: 0,  result: '', loading: true }
    this.refreshTick = this.refreshTick.bind(this)
  }
  
    componentDidMount() {
        this.generateSetupCode();
        this.getCurrentPin();
        this.interval = setInterval(this.refreshTick, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    refreshTick() {
        if(this.state.timer === 0){
            this.getCurrentPin();
        }else {
            this.setState({timer: this.state.timer - 1})
        }
    }

  render() {
    return (
        <div className="container">
              <div className="text-center text-primary border-bottom mb-1">
                  <h1>Authenticator Account</h1>
              </div>
            <div className="row">
                <h2>Current AccountSecret : {this.state.account}</h2>
            </div>
              <div className="row">
                  <div className="col-sm-12 col-md-10 col-xl-8">
                      <ol className="list">
                          <li>
                              <p>
                                  Download a two-factor authenticator app like Microsoft Authenticator for
                                  <a href="https://go.microsoft.com/fwlink/?Linkid=825071"> Windows Phone </a>,
                                  <a href="https://go.microsoft.com/fwlink/?Linkid=825072"> Android </a> and
                                  <a href="https://go.microsoft.com/fwlink/?Linkid=825073"> iOS </a> or
                                  Google Authenticator for
                                  <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;hl=en"> Android </a> and
                                  <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"> iOS </a>.
                              </p>
                          </li>
                          <li>
                              <div className="mb-1">
                                  Scan the QR Code or enter this key
                                  <div className="d-inline-flex">
                                      <a className="btn-copy" data-title="Copy" href="#" role="button"
                                         data-original-title="Copy">
                                              <kbd>{this.addSpaceWithEvery4Characters(this.state.result.ManualEntryKey||'')}</kbd>
                                      </a>
                                  </div> into your two factor authenticator app. Spaces and casing do not matter.
                                  <div id="qrCode" className="pt-2"
                                       title={""+this.state.qrCodeUrl }>
                                      <QRCode value={""+this.state.qrCodeUrl } />
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
                              <button type="button" className="btn btn-primary">
                                  <span className="code-label">{this.state.currentPin}</span> <span className="badge bg-secondary">{this.state.timer}</span>
                              </button>
                              <h4 className="text-warning">
                                  CAUTION:
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
        let uri = `api/twofa/currentPin/${this.state.account}`
        const response = await fetch(uri)
        const data = await response.json()
        this.setState({ timer: 30, loading: false, currentPin:data })
    }

    async generateSetupCode() {
        let uri = `api/twofa/${this.state.account}`
        try {
            const response = await fetch(uri)
            const data = await response.json()
            const accountLabel = data.AccountSecretKey.substring(0, data.AccountSecretKey.indexOf(':'))
            const qrCodeUrl = `otpauth://totp/Lab.Google2FA:${accountLabel}?secret=${data.ManualEntryKey}&amp;issuer=${data.Account}&amp;digits=6`
            this.setState({result: data, qrCodeUrl: qrCodeUrl, loading: false})
        }catch(error){
            console.log(error)
        }
    }

    addSpaceWithEvery4Characters(value){
        let result = ''
        for (let i = 0; i < value.length; i++) {
            result += value.charAt(i)
            if((i+1)%4 === 0){
                result += ' '
            }
        }

        return result
    }
}
