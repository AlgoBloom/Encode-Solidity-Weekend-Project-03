// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IMyToken {
    function getPastVotes(address account, uint256 blockNumber) external;
}

contract Ballot {
    struct Proposal {
        bytes32 name;   
        uint voteCount; 
    }

    IMyToken public tokenContract;
    Proposal[] public proposals;
    constructor(bytes32[] memory proposalNames, address _tokenContract) {
        tokenContract = IMyToken(_tokenContract);
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({ name: proposalNames[i], voteCount: 0 }));
        }
    }

    function vote(uint proposal, uint256 amount) external {
        uint256 temp_VotingPower = 0;     // TODO replace temp_voting power
        require(temp_VotingPower >= amount);
        proposals[proposal].voteCount += amount; 
    }

    function votingPower(address account) public view returns (uint256) {
        
    }

    function winningProposal() public view
            returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }
    function winnerName() external view
            returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}