import '@clerk/nextjs'
import '@/styles/Message.css'
import '@/styles/Home.css'
import 'next/app'

export default function Page() {
  return (
    <div className="layout">
      <div className="fixed-top">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <div className="page-title">
          <div className="row">
            <h4>Chat Web App</h4>
            <img src="https://www.bootdey.com/img/Content/avatar/avatar5.png" alt="Retail Admin" />
          </div>
        </div>
        <div className="top-bar">
          <div className="navbar">
            <a href="home">
              <i className="fas fa-home"></i>
            </a>
            <a href="message">
              <i className="far fa-comment-dots"></i>
            </a>
            <a href="#">
              <i className="fas fa-users"></i>
            </a>
            <a href="#">
              <i className="far fa-bell"></i>
            </a>
          </div>
        </div>
      </div>
      <div style={{ height: '16vh' }}></div>

      <div className="layout-main-home">
        <div className="layout-left-home">
          <div className="nav-bar">
            <ul className="nav">
              <li>
                <i className="fas fa-newspaper"></i>
                <a href="home" title="">
                  Trang chủ
                </a>
              </li>            
              <li>
              <i className="fas fa-users"></i>
                <a href="" title="">
                  Nhóm
                </a>
              </li>
              <li>
                <i className="fas fa-user"></i>
                <a href="" title="">
                  Bạn bè
                </a>
              </li>
              <li>
                <i className="fas fa-image"></i>
                <a href="" title="">
                  Hình ảnh
                </a>
              </li>
              <li>
                <i className="fas fa-video"></i>
                <a href="" title="">
                  Video
                </a>
              </li>
              
               <li>
               <i className="fas fa-gamepad"></i>
                <a href="" title="">
                  Chơi game
                </a>
              </li>
              <li>
                <i className="fas fa-power-off"></i>
                <a href="sign-in" title="">
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="layout-center-home">
          <div className="col-lg-6">
            <div className="central-meta">
              <div className="new-postbox">
                <img
                  src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                  alt="Retail Admin"
                />
                <div className="newpst-input">
                  <form method="post">
                    <textarea placeholder="Bạn đang nghĩ gì?"></textarea>
                    <div className="attachments">
                      <ul>
                        <li>
                          <i className="fa fa-music"></i>
                          <label className="fileContainer">
                            <input type="file"></input>
                          </label>
                        </li>
                        <li>
                          <i className="fa fa-image"></i>
                          <label className="fileContainer">
                            <input type="file"></input>
                          </label>
                        </li>
                        <li>
                          <i className="fa fa-video-camera"></i>
                          <label className="fileContainer">
                            <input type="file"></input>
                          </label>
                        </li>
                        <li>
                          <i className="fa fa-camera"></i>
                          <label className="fileContainer">
                            <input type="file"></input>
                          </label>
                        </li>
                        <li>
                          <button type="submit">Đăng</button>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="loadMore">
              <div className="central-meta item">
                <div className="user-post">
                  <div className="friend-info">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                      alt="Retail Admin"
                    />

                    <div className="friend-name">
                      <ins>
                        <a href="time-line.html" title="">
                          Janice Griffith
                        </a>
                      </ins>
                      <span>published: june,2 2018 19:PM</span>
                    </div>
                    <div className="description">
                      <p>
                        World's most beautiful car in Curabitur{' '}
                        <a href="#" title="">
                          #test drive booking !
                        </a>{' '}
                        the most beatuiful car available in america and the saudia arabia, you can
                        book your test drive by our official website
                      </p>
                    </div>
                    <div className="post-meta">
                      <img
                        src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/tai-hinh-nen-dep-nhat-the-gioi-57.jpg"
                        alt=""
                      ></img>
                      <div className="we-video-info">
                        <ul>
                          <li>
                            <span data-toggle="tooltip" title="like">
                              <i className="fas fa-heart"></i>
                              <ins>200</ins>
                            </span>
                          </li>

                          <li>
                            <span className="comment" data-toggle="tooltip" title="Comments">
                              <i className="far fa-comment"></i>
                              <ins>52</ins>
                            </span>
                          </li>

                          <li>
                            <span className="dislike" data-toggle="tooltip" title="dislike">
                              <i className="fas fa-share-alt"></i>
                              <ins>200</ins>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="like-comment-share">
                    <ul>
                      <li>
                        <span className="like" title="dislike">
                          <i className="fas fa-heart"></i>
                          Like
                        </span>
                      </li>
                      <li>
                        <span className="like" title="dislike">
                          <i className="far fa-comment"></i>
                          Comments
                        </span>
                      </li>
                      <li>
                        <span className="like" title="dislike">
                          <i className="fas fa-share-alt"></i>
                          Share
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="coment-area">
                    <ul className="we-comet">
                      <li>
                        <div className="comet-avatar">
                          <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                            alt="Retail Admin"
                          />
                        </div>
                        <div className="we-comment">
                          <div className="coment-head">
                            <h5>
                              <a href="time-line.html" title="">
                                Jason borne
                              </a>
                            </h5>
                            <span>1 year ago</span>
                            <a className="we-reply" href="#" title="Reply">
                              <i className="fa fa-reply"></i>
                            </a>
                          </div>
                          <p>
                            we are working for the dance and sing songs. this car is very awesome
                            for the youngster. please vote this car and like our post
                          </p>
                        </div>
                        <ul>
                          <li>
                            <div className="comet-avatar">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar4.png"
                                alt="Retail Admin"
                              />
                            </div>
                            <div className="we-comment">
                              <div className="coment-head">
                                <h5>
                                  <a href="time-line.html" title="">
                                    alexendra dadrio
                                  </a>
                                </h5>
                                <span>1 month ago</span>
                                <a className="we-reply" href="#" title="Reply">
                                  <i className="fa fa-reply"></i>
                                </a>
                              </div>
                              <p>
                                yes, really very awesome car i see the features of this car in the
                                official website of{' '}
                                <a href="#" title="">
                                  #Mercedes-Benz
                                </a>{' '}
                                and really impressed
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="comet-avatar">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                alt="Retail Admin"
                              />
                            </div>
                            <div className="we-comment">
                              <div className="coment-head">
                                <h5>
                                  <a href="time-line.html" title="">
                                    Olivia
                                  </a>
                                </h5>
                                <span>16 days ago</span>
                                <a className="we-reply" href="#" title="Reply">
                                  <i className="fa fa-reply"></i>
                                </a>
                              </div>
                              <p>
                                i like lexus cars, lexus cars are most beautiful with the awesome
                                features, but this car is really outstanding than lexus
                              </p>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#" title="" className="showmore underline">
                          more comments
                        </a>
                      </li>
                      <li className="post-comment">
                        <div className="comet-avatar">
                          <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                            alt="Retail Admin"
                          />
                        </div>
                        <div className="post-comt-box">
                          <form method="post" className="comment">
                            <textarea className="import" placeholder="Viết bình luận..."></textarea>
                            <button type="submit">
                              <i className="fas fa-paper-plane" style={{ color: '#9ec94a' }}></i>
                            </button>
                          </form>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
