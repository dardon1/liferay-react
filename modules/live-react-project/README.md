# live-react-project

Live React Project

Steps:

1. Set the path in .npbmbuildrc to your own liferayDir 
e.a. "liferayDir": "/Users/danielle.ardon/Projects/REACT/server/liferay-dxp-7.3.10-ga1"
2. The Basic Authentication Token in index.js is a Base64 encoded string of test@liferay.com:test
   If you use a different user in your local installation you have to change it.
3. In the components there is a hardcoded sitekey for now, you can change this or add variables :) 
	(Tip: the sitekey can be found in Site settings )
4. Use the command npm run deploy to deploy the portlet, it can be found under the Widget category React	