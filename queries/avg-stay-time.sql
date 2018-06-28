SELECT avg((e2.time - e1.time)/(1000*3600*24.0)) AS "Average stay time of user (days)"
FROM events AS e1
INNER JOIN events AS e2
    ON e1.id = e2.id
WHERE e1.type = 'install'
        AND e2.type='uninstall'; 

-- Output

--  	Average stay time of user (days)
-- 1	0.07732356365740742

-- TODO: It is not optimized, I think we can further optimize