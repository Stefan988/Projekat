import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, Sector, Tooltip, XAxis, YAxis } from 'recharts';
import { Container } from 'semantic-ui-react';
import { Post, User } from '../model/model.type';
import { StateType } from '../model/store.type';

interface Props {
    posts: Post[],
    user: User
}
function AdminPage(props: Props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [users, setUsers] = React.useState<User[]>([]);
    const noOfPosts = (user: User) => {
        return props.posts.filter(element => element.author?.id === user.id).length;
    }
    React.useEffect(() => {
        Axios.get('https://localhost:5000/user').then(value => {
            setUsers(value.data);
        })
    }, []);
    if (!props.user || props.user.category === 'user') {
        return (
            <Redirect to='/login' />
        )
    }
    return (
        <Container fluid>
            <PieChart

                width={500}
                height={500}
                compact
                className='whiteBackground'
            >
                <Pie

                    activeIndex={activeIndex}
                    onMouseEnter={(data, index) => {
                        setActiveIndex(index);
                    }}
                    onMouseDown={(data, index) => {
                        setSelectedIndex(index);
                    }}
                    activeShape={renderActiveShape}
                    data={users.map(element => {
                        return {
                            name: element.username,
                            value: noOfPosts(element)
                        }
                    })}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"

                />
            </PieChart>


            <BarChart

                className='whiteBackground'
                compact
                width={600}
                height={500}
                data={users.length ? props.posts.filter(post => post.author.id === users[selectedIndex].id).map(element => {
                    return {
                        post: element.title.length > 8 ? element.title.slice(0, 8) + '...' : element.title,
                        value: element.comments.length
                    }
                }) : []}
            >
                <XAxis name='posts' dataKey="post" >
                    <Label value={users.length ? `${users[selectedIndex].username}'s posts` : 'Loading'} offset={0} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'Number of comments', angle: -90, position: 'insideLeft', fontSize: 14 }} minTickGap={1} />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>


        </Container>
    );
}
const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} post${value > 1 ? 's' : ''}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
export default connect((state: StateType) => {
    return {
        posts: state.posts,
        user: state.user
    }
})(AdminPage)