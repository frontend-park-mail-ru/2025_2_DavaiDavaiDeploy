import { Component } from '@lib/index';
import { RouterContext } from './routerContext';

interface LinkProps{
    href: string
    children: Component;
}

export class Link extends Component<LinkProps> {
    href: string;
    static contextType = RouterContext;
    
    constructor(props: LinkProps){
        super(props)
        this.href = props.href
        if (!this.context){
            throw Error("no context provided in Link")
        }
    }

    handleClick = (e: Event) => {
    e.preventDefault();
    this.context.navigate(to);
  };

    render(): any{
        return(
            <a href={this.href} onClick={this.handleClick}>
                {this.props.children}
            </a>
        )
    }
}