"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentBox = function (_React$Component) {
  _inherits(CommentBox, _React$Component);

  function CommentBox() {
    _classCallCheck(this, CommentBox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      showComments: false,
      comments: []
    };
    return _this;
  }

  CommentBox.prototype.componentWillMount = function componentWillMount() {
    this._fetchComments();
  };

  CommentBox.prototype.render = function render() {
    var comments = this._getComments();
    return React.createElement(
      "div",
      { className: "comment-box" },
      React.createElement(CommentForm, { addComment: this._addComment.bind(this) }),
      React.createElement(CommentAvatarList, { avatars: this._getAvatars() }),
      this._getPopularMessage(comments.length),
      React.createElement(
        "h3",
        { className: "comment-count" },
        this._getCommentsTitle(comments.length)
      ),
      React.createElement(
        "div",
        { className: "comment-list" },
        comments
      )
    );
  };

  CommentBox.prototype._getAvatars = function _getAvatars() {
    return this.state.comments.map(function (comment) {
      return comment.avatarUrl;
    });
  };

  CommentBox.prototype._getPopularMessage = function _getPopularMessage(commentCount) {
    var POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return React.createElement(
        "div",
        null,
        "This post is getting really popular, don't miss out!"
      );
    }
  };

  CommentBox.prototype._getComments = function _getComments() {
    var _this2 = this;

    return this.state.comments.map(function (comment) {
      return React.createElement(Comment, {
        id: comment.id,
        author: comment.author,
        body: comment.body,
        avatarUrl: comment.avatarUrl,
        onDelete: _this2._deleteComment.bind(_this2),
        key: comment.id });
    });
  };

  CommentBox.prototype._getCommentsTitle = function _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return commentCount + " comments";
    }
  };

  CommentBox.prototype._addComment = function _addComment(commentAuthor, commentBody) {
    var comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody,
      avatarUrl: 'images/default-avatar.png'
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  };

  CommentBox.prototype._fetchComments = function _fetchComments() {
    var _this3 = this;

    $.ajax({
      method: 'GET',
      url: 'comments.json',
      success: function success(comments) {
        _this3.setState({ comments: comments });
      }
    });
  };

  CommentBox.prototype._deleteComment = function _deleteComment(commentID) {
    var comments = this.state.comments.filter(function (comment) {
      return comment.id !== commentID;
    });

    this.setState({ comments: comments });
  };

  return CommentBox;
}(React.Component);

var CommentForm = function (_React$Component2) {
  _inherits(CommentForm, _React$Component2);

  function CommentForm() {
    _classCallCheck(this, CommentForm);

    var _this4 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this4.state = {
      characters: 0
    };
    return _this4;
  }

  CommentForm.prototype.render = function render() {
    var _this5 = this;

    return React.createElement(
      "form",
      { className: "comment-form", onSubmit: this._handleSubmit.bind(this) },
      React.createElement(
        "label",
        null,
        "New comment"
      ),
      React.createElement(
        "div",
        { className: "comment-form-fields" },
        React.createElement("input", { placeholder: "Name:", ref: function ref(c) {
            return _this5._author = c;
          } }),
        React.createElement("textarea", { placeholder: "Comment:", ref: function ref(c) {
            return _this5._body = c;
          }, onChange: this._getCharacterCount.bind(this) })
      ),
      React.createElement(
        "p",
        null,
        this.state.characters,
        " characters"
      ),
      React.createElement(
        "div",
        { className: "comment-form-actions" },
        React.createElement(
          "button",
          { type: "submit" },
          "Post comment"
        )
      )
    );
  };

  CommentForm.prototype._getCharacterCount = function _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  };

  CommentForm.prototype._handleSubmit = function _handleSubmit(event) {
    event.preventDefault();

    if (!this._author.value || !this._body.value) {
      alert('Please enter your name and comment.');
      return;
    }

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0 });
  };

  return CommentForm;
}(React.Component);

var CommentAvatarList = function (_React$Component3) {
  _inherits(CommentAvatarList, _React$Component3);

  function CommentAvatarList() {
    _classCallCheck(this, CommentAvatarList);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  CommentAvatarList.prototype.render = function render() {
    var _props$avatars = this.props.avatars;
    var avatars = _props$avatars === undefined ? [] : _props$avatars;

    return React.createElement(
      "div",
      { className: "comment-avatars" },
      React.createElement(
        "h4",
        null,
        "Authors"
      ),
      React.createElement(
        "ul",
        null,
        avatars.map(function (avatarUrl, i) {
          return React.createElement(
            "li",
            { key: i },
            React.createElement("img", { src: avatarUrl })
          );
        })
      )
    );
  };

  return CommentAvatarList;
}(React.Component);

var Comment = function (_React$Component4) {
  _inherits(Comment, _React$Component4);

  function Comment() {
    _classCallCheck(this, Comment);

    var _this7 = _possibleConstructorReturn(this, _React$Component4.call(this));

    _this7.state = {
      isAbusive: false
    };
    return _this7;
  }

  Comment.prototype.render = function render() {
    var commentBody = undefined;
    if (!this.state.isAbusive) {
      commentBody = this.props.body;
    } else {
      commentBody = React.createElement(
        "em",
        null,
        "Content marked as abusive"
      );
    }
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement("img", { src: this.props.avatarUrl, alt: this.props.author + "'s picture" }),
      React.createElement(
        "p",
        { className: "comment-header" },
        this.props.author
      ),
      React.createElement(
        "p",
        { className: "comment-body" },
        commentBody
      ),
      React.createElement(
        "div",
        { className: "comment-actions" },
        React.createElement(RemoveCommentConfirmation, { onDelete: this._handleDelete.bind(this) }),
        React.createElement(
          "a",
          { href: "#", onClick: this._toggleAbuse.bind(this) },
          "Report as Abuse"
        )
      )
    );
  };

  Comment.prototype._toggleAbuse = function _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  };

  Comment.prototype._handleDelete = function _handleDelete() {
    this.props.onDelete(this.props.id);
  };

  return Comment;
}(React.Component);

var RemoveCommentConfirmation = function (_React$Component5) {
  _inherits(RemoveCommentConfirmation, _React$Component5);

  function RemoveCommentConfirmation() {
    _classCallCheck(this, RemoveCommentConfirmation);

    var _this8 = _possibleConstructorReturn(this, _React$Component5.call(this));

    _this8.state = {
      showConfirm: false
    };
    return _this8;
  }

  RemoveCommentConfirmation.prototype.render = function render() {
    var confirmNode = undefined;
    if (this.state.showConfirm) {
      return React.createElement(
        "span",
        null,
        React.createElement(
          "a",
          { href: "", onClick: this._confirmDelete.bind(this) },
          "Yes "
        ),
        " - or - ",
        React.createElement(
          "a",
          { href: "", onClick: this._toggleConfirmMessage.bind(this) },
          " No"
        )
      );
    } else {
      confirmNode = React.createElement(
        "a",
        { href: "", onClick: this._toggleConfirmMessage.bind(this) },
        "Delete comment?"
      );
    }
    return React.createElement(
      "span",
      null,
      confirmNode
    );
  };

  RemoveCommentConfirmation.prototype._toggleConfirmMessage = function _toggleConfirmMessage(e) {
    e.preventDefault();

    this.setState({
      showConfirm: !this.state.showConfirm
    });
  };

  RemoveCommentConfirmation.prototype._confirmDelete = function _confirmDelete(e) {
    e.preventDefault();
    this.props.onDelete();
  };

  return RemoveCommentConfirmation;
}(React.Component);

ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('comments'));