import {Component, createApp} from '@lib/react.js';

class Card extends Component {
  render() {
    return (
      <div className='card'>
        <div className='card-header'>{this.props.title}</div>
        <div className='card-body'>{this.props.children}</div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Card title='Моя карточка'>
        <p>Это содержимое карточки</p>
        <button>Кнопка внутри карточки</button>
      </Card>
    );
  }
}

const app = createApp(App);
app.mount(document.body)