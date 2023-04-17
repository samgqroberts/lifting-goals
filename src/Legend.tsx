import { colors } from "./styles"

const margin = 20;
const lineWidth = 3;

export const Legend: React.FC = () => {
    return (
      <div style={{display: 'flex', width: `calc(100% - ${2 * margin}px)`, marginLeft: margin, marginTop: 10}}>
        {(['noob', 'beginner', 'intermediate', 'advanced'] as const).map((zone, i) => {
            return (
                <div key={zone} style={{display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'center', marginTop: `${i * lineWidth}px`}}>
                    <span>{zone}</span>
                    <div style={{height: lineWidth, width: '100%', background: colors[zone]}} />
                </div>
            )
        })}
      </div>
    )
}