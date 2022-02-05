import './MainBoard.scss'

function MainBoard() {
    return (
        <div className="MainBoard">
            <h4>동아리 공지</h4>
            <table>
                <thead>
                    <tr>
                        <th>
                            <h5>번호</h5>
                        </th>
                        <th>
                            <h5>제목</h5>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p className='number'>
                                1
                            </p>
                        </td>
                        <td>
                            <p className='content'>
                                content
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='number'>
                                2
                            </p>
                        </td>
                        <td>
                            <p className='content'>
                                content
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='number'>
                                3
                            </p>
                        </td>
                        <td>
                            <p className='content'>
                                content
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='number'>
                                4
                            </p>
                        </td>
                        <td>
                            <p className='content'>
                                content
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='number'>
                                5
                            </p>
                        </td>
                        <td>
                            <p className='content'>
                                content
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='number'>
                                6
                            </p>
                        </td>
                        <td>
                            <p className='content'>
                                content
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='number'>
                                7
                            </p>
                        </td>
                        <td>
                            <p className='content'>
                                content
                            </p>
                        </td>
                    </tr>
                  
                    
                </tbody>
            </table>
        </div>

    )
}
export default MainBoard;