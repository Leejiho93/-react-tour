import styled from 'styled-components';
import { Pagination } from 'antd';

export const Bar = styled.div`
    width: 940px;
    height: 30px;
    background-color: #f89d3d;
`;

export const Li = styled.li`
    margin-left: 5px;
    width: 45px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #e2e2e2;
    &.active {
        background: #6b6969;
        font-weight: bold;
        color: #fff;
    }
    &:hover {
        font-weight: bold;
    }
`;
export const Ul = styled.ul`
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

// 투어 페이지
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 980px;
    margin: 0 auto;
    ${({ theme }) => theme.window.laptop} {
        width: 100%;
    }
`;

export const Select = styled.div`
    display: flex;
    width: 910px;
    height: 42px;
    ${({ theme }) => theme.window.laptop} {
        width: 480px;
        height: 84px;

        & ul {
            justify-content: center;
        }
        & li {
            margin-bottom: 5px;
        }
    }
    ${({ theme }) => theme.window.mobileL} {
        width: 300px;
        height: 126px;
        & li {
            margin: 0 4px 5px;
            height: 35px;
            width: 40px;
        }
    }
`;

export const Title = styled.h2`
    font-size: 40px;
    font-weight: 700;
    pargin: 50px 0;
    text-align: center;
`;

// 공통
export const SortWrapper = styled.div`
    text-align: end;
    width: 100%;
    margin: 30px 50px 10px 0;
    ${({ theme }) => theme.window.laptop} {
        margin: 30px 0px 10px 0;
        text-align: center;
    }
`;
export const SortButton = styled.button`
    border-radius: 10px;
    border: none;
    padding: 7px 10px;
    margin-right: 5px;
    cursor: pointer;
    background: none;
    &:hover {
        font-weight: bold;
    }
    &.active {
        font-weight: bold;
        background: #e2e2e2;
    }
`;

export const PaginationCustom = styled(Pagination)`
    text-align: center;
    margin: 70px 0;
`;

// 메인 화면
export const TitleWrapper = styled.div`
    margin: 50px 0;
    ${({ theme }) => theme.window.laptop} {
        margin: 110px 0 50px;
    }
`;

export const HotMenu = styled.div`
    ${({ theme }) => theme.window.laptop} {
    }

    display: flex;
    justify-content: space-between;
    height: 60px;
    border-radius: 30px 30px 0 0;
    align-items: flex-end;
    margin: 100px 50px 20px 50px;

    & a {
        color: #000;
        & span {
            font-size: 20px;
            font-family: BMJUA, sans-serif;
        }
        & span:last-child {
            font-size: 17px;
        }
    }
    > span:first-child {
        font-size: 40px;
        font-family: BMHANNA, sans-serif;
        font-weight: bold;
    }
`;
