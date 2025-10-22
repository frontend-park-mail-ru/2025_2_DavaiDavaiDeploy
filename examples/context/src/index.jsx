import {Component, createContext, render} from '@lib/index';

const ThemeContext = createContext({theme: 'light', primaryColor: 'blue'});
const UserContext = createContext({name: 'Guest', role: 'user'});
const SettingsContext = createContext({language: 'en', notifications: true});

class UserProfile extends Component {
  static contextType = UserContext;

  render() {
    const user = this.context;
    return (
      <div>
        <div style={{padding: '10px', border: '1px solid #ccc', margin: '10px 0'}}>
          <h3>User Profile (using contextType)</h3>
          <p>Name: {user.name}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>
    );
  }
}

class ThemeSettings extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return (
      <div
        style={{
          padding: '15px',
          background: theme.theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
          color: theme.theme === 'dark' ? 'white' : 'black',
          margin: '10px 0',
        }}>
        <h3>Theme Settings (using contextType)</h3>
        <p>Current theme: {theme.theme}</p>
        <p>Primary color: {theme.primaryColor}</p>
        {this.props.children}
      </div>
    );
  }
}

class NotificationsPanel extends Component {
  static contextType = SettingsContext;

  render() {
    const settings = this.context;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div
            style={{
              padding: '10px',
              background: theme.theme === 'dark' ? '#333' : '#fff',
              color: theme.theme === 'dark' ? '#fff' : '#333',
              border: `2px solid ${theme.primaryColor}`,
            }}>
            <h4>Notifications (using contextType)</h4>
            <p>Status: {settings.notifications ? '🔔 Enabled' : '🔕 Disabled'}</p>
            {settings.notifications && (
              <div style={{color: theme.primaryColor}}>New messages available!</div>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ComplexHeader extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;

    return (
      <UserContext.Consumer>
        {user => (
          <header
            style={{
              background: theme.theme === 'dark' ? '#1a1a1a' : '#ffffff',
              color: theme.theme === 'dark' ? '#ffffff' : '#000000',
              padding: '20px',
              borderBottom: `3px solid ${theme.primaryColor}`,
            }}>
            <h1>Welcome to Complex App, {user.name}! (using contextType for theme)</h1>
            <p>
              You are viewing in {theme.theme} mode with {theme.primaryColor} accent
            </p>

            <SettingsContext.Provider value={this.props.settings}>
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

// Новый компонент, демонстрирующий contextType
class ContextTypeDemo extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return (
      <div
        style={{
          padding: '15px',
          margin: '10px 0',
          border: '2px dashed #007acc',
          background: theme.theme === 'dark' ? '#1e1e1e' : '#f0f8ff',
          color: theme.theme === 'dark' ? '#ffffff' : '#000000',
        }}>
        <h4>🚀 ContextType Demo Component</h4>
        <p>
          This component uses <code>static contextType = ThemeContext</code>
        </p>
        <p>
          Current theme: <strong>{theme.theme}</strong>
        </p>
        <p>
          Primary color: <strong style={{color: theme.primaryColor}}>{theme.primaryColor}</strong>
        </p>
        <p>
          Access via <code>this.context</code> - much cleaner than Consumer!
        </p>
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
              <ComplexHeader settings={this.state.settings} />

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

                  {/* Новый компонент с contextType */}
                  <ContextTypeDemo />
                </div>

                <div style={{flex: 1}}>
                  <NotificationsPanel />

                  <ThemeContext.Provider
                    value={{theme: this.state.theme, primaryColor: this.state.primaryColor}}>
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

render(<ComplexApp />, document.body);
