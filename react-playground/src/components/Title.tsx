import './Title.css';

function Title(props: { title: string, subtitle: string }) {

    return (
        <div className="title-block">
            <h1 className="title">{ props.title }</h1>
            <br />
            <h2 className="subtitle">{ props.subtitle }</h2>
        </div>
    )
}

export default Title;