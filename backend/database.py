from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session


SQLALCHEMY_DATABASE = "sqlite:///.sales_info.db"

# engineの設定
Engine = create_engine(SQLALCHEMY_DATABASE, connect_args={"check_same_thread": False})

# セッションの作成
Session_class = scoped_session(
  sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=Engine
  )
)

# テーブルを作成する
Base = declarative_base()
