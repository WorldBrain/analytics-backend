SELECT count(*) AS "Active no. of users in last 7 days"
FROM 
    (SELECT id,
         (to_unixtime(localtimestamp) - max(time)/1000)/(3600*24) AS time
    FROM events
    GROUP BY  id )
WHERE time <= 7; 

-- Output

--  	Active no. of users in last 7 days
-- 1	38