SELECT id,
         (to_unixtime(localtimestamp) - max(time)/1000)/(3600*24) AS "Time (Days)"
FROM events
GROUP BY  id
ORDER BY  time desc

-- It will generate the output with this format

--      id	                                    Time (Days)
-- 1	db91fc2b-034f-4c6b-807c-2c8e54042795	5.969148518517613
-- 2	c3415c93-0874-42a2-b9a4-913287064eb8	3.2743221296287244
-- 3	1aafb6dc-fe17-444f-9e93-74141c3e6150	2.962030462962058
-- 4	a9ea9019-fb3c-4672-b0ab-1308b3f77471	2.939831388887984
-- 5	cb12706f-9e30-4c56-a0eb-080f40e81e65	2.906150833332428