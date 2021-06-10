# FootBallApi:
We should make database called MatchesDB with two tables -Matches and Player
Matches
{ 
 MatchesId int autoincrement
 TeamOne varchar(50)
 TeamTwo varchar(50)
 Result varchar(50)
}

Player
{
 PlayerId int autoincrement
 PlayerName varchar(50)
 PlayerTeram varchar(50)
 PlayerMatches varchar(50)
 PlayerGoals int
}
