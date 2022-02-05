import './MainSchedule.scss'

function MainSchedule() {
    return (
        <div className="MainSchedule">
            <h4>학사 일정</h4>
            <table>
                <thead>
                    <tr>
                        <th>
                            MON
                        </th>
                        <th>
                            TUE
                        </th>
                        <th>
                            WED
                        </th>
                        <th>
                            THU
                        </th>
                        <th>
                            FRI
                        </th>
                        <th className='holiday'>
                            SAT
                        </th>
                        <th className='holiday'>
                            SUN
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='otherMonth'>27</td>
                        <td className='otherMonth'>28</td>
                        <td className='otherMonth'>29</td>
                        <td className='otherMonth'>30</td>
                        <td className='otherMonth'>31</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>31</td>
                        <td className='otherMonth'>1</td>
                        <td className='otherMonth'>2</td>
                        <td className='otherMonth'>3</td>
                        <td className='otherMonth'>4</td>
                        <td className='otherMonth'>5</td>
                        <td className='otherMonth'>6</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
export default MainSchedule;