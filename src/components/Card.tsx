import { ReactNode } from "react"

interface CardProps{
    className?: string
    children?: ReactNode
    title: string
    description: string
    show: boolean
}

export const Card = (props: CardProps) => {
    return(
        <div
            className={`
                shadow-lg w-fit animate-fade-in bg-white
                [&>div>input]:border-zinc-400
                [&>form>input]:border-zinc-400
                [&>form>div>input]:border-zinc-400
                ${props.className}`
            }
            style={props.show ? {} : {display: "none"}}
        >
            <h2 className="bg-orange-moodle text-white text-center text-lg p-2">{props.title}</h2>
            <p className="p-3 max-w-[42rem] text-info-text text-center font-[300]">{props.description}</p>
            {props.children}
        </div>
    )
}