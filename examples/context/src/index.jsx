import {Component, createApp, createContext} from '@lib/react.js';


const ThemeContext = createContext({theme: 'light', primaryColor: 'blue'});
const UserContext = createContext({name: 'Guest', role: 'user'});
const SettingsContext = createContext({language: 'en', notifications: true});

class UserProfile extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <SettingsContext.Consumer>
            {settings => (
              <div style={{padding: '10px', border: '1px solid #ccc', margin: '10px 0'}}>
                <h3>User Profile</h3>
                <p>Name: {user.name}</p>
                <p>Role: {user.role}</p>
                <p>Language: {settings.language}</p>
                <p>Notifications: {settings.notifications ? 'On' : 'Off'}</p>
              </div>
            )}
          </SettingsContext.Consumer>
        )}
      </UserContext.Consumer>
    );
  }
}

class ThemeSettings extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div
            style={{
              padding: '15px',
              background: theme.theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
              color: theme.theme === 'dark' ? 'white' : 'black',
              margin: '10px 0',
            }}>
            <h3>Theme Settings</h3>
            <p>Current theme: {theme.theme}</p>
            <p>Primary color: {theme.primaryColor}</p>
            {this.props.children}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class NotificationsPanel extends Component {
  render() {
    return (
      <SettingsContext.Consumer>
        {settings => (
          <ThemeContext.Consumer>
            {theme => (
              <div
                style={{
                  padding: '10px',
                  background: theme.theme === 'dark' ? '#333' : '#fff',
                  color: theme.theme === 'dark' ? '#fff' : '#333',
                  border: `2px solid ${theme.primaryColor}`,
                }}>
                <h4>Notifications</h4>
                <p>Status: {settings.notifications ? '🔔 Enabled' : '🔕 Disabled'}</p>
                {settings.notifications && (
                  <div style={{color: theme.primaryColor}}>New messages available!</div>
                )}
              </div>
            )}
          </ThemeContext.Consumer>
        )}
      </SettingsContext.Consumer>
    );
  }
}


class ComplexHeader extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <UserContext.Consumer>
            {user => (
              <header
                style={{
                  background: theme.theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  color: theme.theme === 'dark' ? '#ffffff' : '#000000',
                  padding: '20px',
                  borderBottom: `3px solid ${theme.primaryColor}`,
                }}>
                <h1>Welcome to Complex App, {user.name}!</h1>
                <p>
                  You are viewing in {theme.theme} mode with {theme.primaryColor} accent
                </p>

                <SettingsContext.Provider value={{language: 'ru', notifications: false}}>
                  <div style={{background: 'rgba(0,0,0,0.1)', padding: '10px', margin: '10px 0'}}>
                    <p>
                      <strong>Local Settings Area (overridden):</strong>
                    </p>
                    <SettingsContext.Consumer>
                      {localSettings => <span>Language: {localSettings.language}</span>}
                    </SettingsContext.Consumer>
                  </div>
                </SettingsContext.Provider>
              </header>
            )}
          </UserContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ControlPanel extends Component {
  render() {
    return (
      <div style={{padding: '20px', background: '#eee', margin: '10px 0'}}>
        <h3>Control Panel</h3>
        <button onClick={this.props.onToggleTheme}>Toggle Theme</button>
        <button onClick={this.props.onChangeColor}>Change Color</button>
        <button onClick={this.props.onToggleUser}>Switch User</button>
        <button onClick={this.props.onToggleLanguage}>Toggle Language</button>
        <button onClick={this.props.onToggleNotifications}>Toggle Notifications</button>
      </div>
    );
  }
}


class ComplexApp extends Component {
  state = {
    theme: 'dark',
    primaryColor: 'purple',
    user: {name: 'Admin', role: 'admin'},
    settings: {language: 'en', notifications: true},
  };

  toggleTheme = () => {
    this.setState(prev => ({
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  changeColor = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    const currentIndex = colors.indexOf(this.state.primaryColor);
    const nextColor = colors[(currentIndex + 1) % colors.length];

    this.setState({primaryColor: nextColor});
  };

  toggleUser = () => {
    this.setState(prev => ({
      user:
        prev.user.role === 'admin' ? {name: 'Guest', role: 'user'} : {name: 'Admin', role: 'admin'},
    }));
  };

  toggleLanguage = () => {
    this.setState(prev => ({
      settings: {
        ...prev.settings,
        language: prev.settings.language === 'en' ? 'ru' : 'en',
      },
    }));
  };

  toggleNotifications = () => {
    this.setState(prev => ({
      settings: {
        ...prev.settings,
        notifications: !prev.settings.notifications,
      },
    }));
  };

  render() {
    return (
      <>
        <ThemeContext.Provider
          value={{
            theme: this.state.theme,
            primaryColor: this.state.primaryColor,
          }}>
          <UserContext.Provider value={this.state.user}>
            <SettingsContext.Provider value={this.state.settings}>
              <ComplexHeader />

              <ControlPanel
                onToggleTheme={this.toggleTheme}
                onChangeColor={this.changeColor}
                onToggleUser={this.toggleUser}
                onToggleLanguage={this.toggleLanguage}
                onToggleNotifications={this.toggleNotifications}
              />

              <div style={{display: 'flex', gap: '20px', padding: '20px'}}>
                {/* Левая колонка */}
                <div style={{flex: 1}}>
                  <ThemeSettings>
                    <UserProfile />
                  </ThemeSettings>
                </div>

                <div style={{flex: 1}}>
                  <NotificationsPanel />

                  <ThemeContext.Provider value={{theme: 'light', primaryColor: 'green'}}>
                    <div
                      style={{
                        padding: '15px',
                        margin: '10px 0',
                        border: '2px dashed green',
                      }}>
                      <h4>Isolated Theme Area</h4>
                      <ThemeContext.Consumer>
                        {localTheme => <p>This area has independent theme: {localTheme.theme}</p>}
                      </ThemeContext.Consumer>
                    </div>
                  </ThemeContext.Provider>
                </div>
              </div>
            </SettingsContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </>
    );
  }
}

const app = createApp(ComplexApp);
app.mount(document.body);
